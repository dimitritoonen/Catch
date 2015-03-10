#region using directives

using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Text;

#endregion

namespace Chirping.Web.Api.Common.Storage
{
    public class ProfileImageStore : IProfileImageStore
    {
        private readonly string _containerName = "profileimages";

        private CloudStorageAccount _storage = null;

        public ProfileImageStore()
        {
            var connectionString = GetCloudConnectionString();
            _storage = CloudStorageAccount.Parse(connectionString);
        }

        private string GetCloudConnectionString()
        {
            var apiKey = ConfigurationManager.AppSettings["CloudStorage.ApiKey"];
            var cloudStorageKey = ConfigurationManager.AppSettings["CloudStorage.ConnectionString"];

            return string.Format(cloudStorageKey, apiKey);
        }

        public void StoreImage(string image, string filename)
        {
            List<Image> images = ProfileImageInitializer.GenerateImages(image, filename);

            StoreImagesInContainer(images);
        }

        private void StoreImagesInContainer(List<Image> images)
        {
            CloudBlobContainer blobContainer = GetBlobContainer();

            foreach (var image in images)
            {
                CloudBlockBlob blockBlob = blobContainer.GetBlockBlobReference(image.FileName);

                using (MemoryStream stream = new MemoryStream(image.ImageInBytes))
                {
                    blockBlob.UploadFromStream(stream);
                }
            }
        }

        private CloudBlobContainer GetBlobContainer()
        {
            CloudBlobClient blobClient = _storage.CreateCloudBlobClient();
            CloudBlobContainer blobContainer = blobClient.GetContainerReference(_containerName);

            blobContainer.CreateIfNotExists();
            blobContainer.SetPermissions(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
            return blobContainer;
        }
        



        public string GetImage(string profileImageReference)
        {
            CloudBlobClient blobClient = _storage.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(_containerName);

            CloudBlockBlob blockBlob = container.GetBlockBlobReference(profileImageReference);

            string image;
            using (var stream = new MemoryStream())
            {
                blockBlob.DownloadToStream(stream);
                image = Encoding.UTF8.GetString(stream.ToArray());
            }

            return image;
        }
    }
}