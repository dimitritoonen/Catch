#region using directives

using Chirping.Web.Api.AutoMapperConfigurators;
using Chirping.Web.Api.Common;
using Chirping.Web.Api.Common.Logging;
using Chirping.Web.Api.Common.TypeMapping;
using Chirping.Web.Api.Data.Repository;
using Chirping.Web.Api.Data.Repository.Authorization;
using Chirping.Web.Api.Processors;
using Chirping.Web.Api.Processors.Account;
using log4net.Config;
using Ninject;
using Ninject.Web.Common;

#endregion

namespace Chirping.Web.Api.Infrastructure
{
    public class NinjectConfigurator
    {
        public void Confgure(IKernel kernel)
        {
            ConfigureBindings(kernel);
        }

        private void ConfigureBindings(IKernel kernel)
        {
            ConfigureLogging(kernel);
            ConfigureAutoMapper(kernel);

            // repositories
            kernel.Bind<IDateTime>().To<DateTimeAdapter>().InSingletonScope();
            kernel.Bind<IUserRepository>().To<UserRepository>();
            kernel.Bind<IAccountRepository>().To<AccountRepository>().InRequestScope();

            // processors
            kernel.Bind<IUserProcessor>().To<UserProcessor>().InRequestScope();
            kernel.Bind<IAccountProcessor>().To<AccountProcessor>().InRequestScope();
        }

        private void ConfigureLogging(IKernel kernel)
        {
            // configures the log4net logging
            XmlConfigurator.Configure();

            var logManager = new LogManagerAdapter();
            kernel.Bind<ILogManager>().ToConstant(logManager);
        }

        private void ConfigureAutoMapper(IKernel kernel)
        {
            kernel.Bind<IAutoMapper>().To<AutoMapperAdapter>().InSingletonScope();

            // configure all AutoMapper type configurators
            kernel.Bind<IAutoMapperTypeConfigurator>()
                .To<UserToNewUserMapping>()
                .InSingletonScope();
            kernel.Bind<IAutoMapperTypeConfigurator>()
                .To<NewUserToUserMapping>()
                .InSingletonScope();

            kernel.Bind<IAutoMapperTypeConfigurator>()
                .To<RegisterUserToAccountUserMapping>()
                .InSingletonScope();

            kernel.Bind<IAutoMapperTypeConfigurator>()
                .To<RegisterExternalUserToAccountUserMapping>()
                .InSingletonScope();
        }
    }
}