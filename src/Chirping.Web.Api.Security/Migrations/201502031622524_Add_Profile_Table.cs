namespace Chirping.Web.Api.Security.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Profile_Table : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Profile",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        NickName = c.String(nullable: false, maxLength: 50),
                        Age = c.String(nullable: false, maxLength: 2),
                        Gender = c.String(nullable: false),
                        City = c.String(nullable: false, maxLength: 255),
                        InterestedIn = c.String(nullable: false),
                        ProfileImage = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.NickName, unique: true);
            
            AddColumn("dbo.User", "Profile_Id", c => c.Long(nullable: false));
            CreateIndex("dbo.User", "Profile_Id");
            AddForeignKey("dbo.User", "Profile_Id", "dbo.Profile", "Id", cascadeDelete: true);
            DropColumn("dbo.User", "NickName");
            DropColumn("dbo.User", "Age");
            DropColumn("dbo.User", "Gender");
            DropColumn("dbo.User", "City");
            DropColumn("dbo.User", "InterestedIn");
            DropColumn("dbo.User", "ProfileImage");
        }
        
        public override void Down()
        {
            AddColumn("dbo.User", "ProfileImage", c => c.String());
            AddColumn("dbo.User", "InterestedIn", c => c.String());
            AddColumn("dbo.User", "City", c => c.String());
            AddColumn("dbo.User", "Gender", c => c.String());
            AddColumn("dbo.User", "Age", c => c.String());
            AddColumn("dbo.User", "NickName", c => c.String());
            DropForeignKey("dbo.User", "Profile_Id", "dbo.Profile");
            DropIndex("dbo.Profile", new[] { "NickName" });
            DropIndex("dbo.User", new[] { "Profile_Id" });
            DropColumn("dbo.User", "Profile_Id");
            DropTable("dbo.Profile");
        }
    }
}
