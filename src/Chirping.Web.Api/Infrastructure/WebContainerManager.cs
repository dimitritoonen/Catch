﻿#region using directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Dependencies;

#endregion

namespace Chirping.Web.Api.Infrastructure
{
    public class WebContainerManager
    {
        public static IDependencyResolver GetDependencyResolver()
        {
            var resolver = GlobalConfiguration.Configuration.DependencyResolver;
            if (resolver != null)
            {
                return resolver;
            }
        
            throw new InvalidOperationException("The dependency resolver has not been set.");
        }

        public static T Get<T>()
        {
            var service = GetDependencyResolver().GetService(typeof(T));

            if (service == null)
            {
                throw new NullReferenceException(string.Format("Requested service of type {0}, but null was found.", typeof(T).FullName));
            }

            return (T)service;
        }

        public static IEnumerable<T> GetAll<T>()
        {
            var services = GetDependencyResolver().GetServices(typeof(T));

            if (!services.Any())
            {
                throw new NullReferenceException(string.Format("Requested service of type {0}, but null was found.", typeof(T).FullName));
            }

            return services.Cast<T>();
        }
    }
}