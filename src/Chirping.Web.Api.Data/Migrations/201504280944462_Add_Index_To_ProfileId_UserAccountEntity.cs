namespace Chirping.Web.Api.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Index_To_ProfileId_UserAccountEntity : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.User", new[] { "Profile_Id" });
            CreateIndex("dbo.User", "Profile_Id", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.User", new[] { "Profile_Id" });
            CreateIndex("dbo.User", "Profile_Id");
        }
    }
}
