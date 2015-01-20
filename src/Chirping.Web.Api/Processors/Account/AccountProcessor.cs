﻿#region using directives

using AutoMapper;
using Chirping.Web.Api.BindingModels.Account;
using Chirping.Web.Api.Common.Domain;
using Chirping.Web.Api.Data.Entities;
using Chirping.Web.Api.Data.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Net.Http;
using System.Threading.Tasks;

#endregion

namespace Chirping.Web.Api.Processors.Account
{
    public class AccountProcessor : IAccountProcessor, IDisposable
    {
        #region constructor

        private IAccountRepository _repository;

        public AccountProcessor(IAccountRepository repository)
        {
            this._repository = repository;
        }

        #endregion

        public async Task<IdentityResult> RegisterUser(RegisterBindingModel registerUser)
        {
            IdentityResult result = null;

            var user = Mapper.Map<RegisterBindingModel, UserAccount>(registerUser);

            if (ProfileImageSelected(registerUser.Profile.ProfileImage))
            {
                user.ProfileImage = string.Format("{0}.jpg", System.Uri.EscapeDataString(registerUser.Email));
            }

            result = await _repository.RegisterUser(user);

            // store the profile picture in Azure cloud storage
            StoreProfileImage(registerUser.Profile.ProfileImage, user.ProfileImage);

            return result;
        }

        private bool ProfileImageSelected(string profileImage)
        {
            return !(string.IsNullOrEmpty(profileImage));
        }

        private void StoreProfileImage(string profileImage, string imageFileName)
        {
            if (!ProfileImageSelected(profileImage))
                return;

            var store = new ImageStore();
            store.StoreImage(profileImage, imageFileName);
        }
        
        public void Logout(HttpRequestMessage request)
        {
            request.GetOwinContext().Authentication.SignOut();
        }

        public Task<IdentityResult> ChangePassword(ChangePasswordBindingModel changedPassword)
        {
            throw new NotImplementedException();
        }

        public Client FindClient(string clientId)
        {
            return _repository.FindClient(clientId);
        }

        #region operations for external logon (Facebook, Google, etc)

        public async Task<UserAccountEntity> FindAsync(UserLoginInfo loginInfo)
        {
            UserAccountEntity user = await _repository.FindAsync(loginInfo);

            return user;
        }

        public async Task<UserAccountEntity> FindByEmailAsync(string email)
        {
            UserAccountEntity user = await _repository.FindByEmailAsync(email);

            return user;
        }

        // create user without password
        public async Task<IdentityResult> CreateAsync(RegisterExternalBindingModel registerUser)
        {
            var user = Mapper.Map<RegisterExternalBindingModel, UserAccount>(registerUser);

            if (ProfileImageSelected(registerUser.Profile.ProfileImage))
            {
                user.ProfileImage = string.Format("{0}.jpg", System.Uri.EscapeDataString(registerUser.Email));
            }

            var result = await _repository.CreateAsync(user);

            // store the profile picture in Azure cloud storage
            StoreProfileImage(registerUser.Profile.ProfileImage, user.ProfileImage);

            return result;
        }

        public async Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login)
        {
            var result = await _repository.AddLoginAsync(userId, login);

            return result;
        }

        #endregion
        

        public void Dispose()
        {
            _repository.Dispose();
        }
    }
}