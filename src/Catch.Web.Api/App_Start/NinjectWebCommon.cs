#region using directives

using System;
using System.Web;

using Microsoft.Web.Infrastructure.DynamicModuleHelper;

using Ninject;
using Ninject.Web.Common;
using Catch.Web.Api.Infrastructure;
using System.Web.Http;

#endregion

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(Catch.Web.Api.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(Catch.Web.Api.NinjectWebCommon), "Stop")]

namespace Catch.Web.Api
{
    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));

            IKernel kernel = null;
            bootstrapper.Initialize(() =>
                {
                    kernel = CreateKernel();
                    return kernel;
                });

            var resolver = new NinjectDependencyResolver(kernel);
            GlobalConfiguration.Configuration.DependencyResolver = resolver;
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

                RegisterServices(kernel);
                return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            var kernerlConfigurator = new NinjectConfigurator();
            kernerlConfigurator.Confgure(kernel);
        }        
    }
}
