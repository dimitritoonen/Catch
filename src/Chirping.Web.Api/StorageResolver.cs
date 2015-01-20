using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.IO;

using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Auth;
using System.Text;

namespace Chirping.Web.Api
{
    public class ImageStore
    {
        private readonly string _containerName = "profileimages";

        private CloudStorageAccount _storage = null;

        public ImageStore()
        {
            var connectionString = GetCloudConnectionString();
            _storage = CloudStorageAccount.Parse(connectionString);
        }

        private string GetCloudConnectionString()
        {
            var apiKey = ConfigurationManager.AppSettings["CloudStorageApiKey"];
            var cloudStorageKey = ConfigurationManager.AppSettings["CloudStorage"];

            return string.Format(cloudStorageKey, apiKey);
        }

        public void StoreImage(string image, string imageReference)
        {
            byte[] imageInBytes = null;

            imageInBytes = Convert.FromBase64String(image);

            CloudBlobClient blobClient = _storage.CreateCloudBlobClient();
            CloudBlobContainer blobContainer = blobClient.GetContainerReference(_containerName);

            blobContainer.CreateIfNotExists();
            blobContainer.SetPermissions(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });

            CloudBlockBlob blockBlob = blobContainer.GetBlockBlobReference(imageReference);

            using (MemoryStream stream = new MemoryStream(imageInBytes))
            {
                blockBlob.UploadFromStream(stream);
            }
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