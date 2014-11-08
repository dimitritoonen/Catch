#region using directives

using Catch.Web.Api.AutoMapperConfigurators;
using Catch.Web.Api.Common;
using Catch.Web.Api.Common.Logging;
using Catch.Web.Api.Common.TypeMapping;
using Catch.Web.Api.Data.Repository;
using Catch.Web.Api.Processors;
using Catch.Web.Api.Processors.Account;
using log4net.Config;
using Ninject;
using Ninject.Web.Common;

#endregion

namespace Catch.Web.Api.Infrastructure
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
        }
    }
}