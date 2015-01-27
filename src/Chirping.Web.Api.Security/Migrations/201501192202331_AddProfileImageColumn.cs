namespace Chirping.Web.Api.Security.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddProfileImageColumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "ProfileImage", c => c.String());
        }
        
        public override void Down()
        {
        }
    }
}
