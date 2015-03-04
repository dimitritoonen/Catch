namespace Chirping.Web.Api.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Activity_Category_tables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Activity",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        Location = c.String(nullable: false, maxLength: 255),
                        Profile_Id = c.Int(nullable: false),
                        ContentText = c.String(nullable: false, maxLength: 250),
                        MaxParticipants = c.Int(nullable: false),
                        Category_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Category", t => t.Category_Id)
                .ForeignKey("dbo.Profile", t => t.Profile_Id)
                .Index(t => t.Profile_Id)
                .Index(t => t.Category_Id);
            
            CreateTable(
                "dbo.Category",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Code = c.String(maxLength: 25),
                        Description = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Code, unique: true);
            
            CreateTable(
                "dbo.ActivityProfile",
                c => new
                    {
                        Activity_Id = c.Int(nullable: false),
                        Profile_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Activity_Id, t.Profile_Id })
                .ForeignKey("dbo.Activity", t => t.Activity_Id)
                .ForeignKey("dbo.Profile", t => t.Profile_Id)
                .Index(t => t.Activity_Id)
                .Index(t => t.Profile_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ActivityProfile", "Profile_Id", "dbo.Profile");
            DropForeignKey("dbo.ActivityProfile", "Activity_Id", "dbo.Activity");
            DropForeignKey("dbo.Activity", "Profile_Id", "dbo.Profile");
            DropForeignKey("dbo.Activity", "Category_Id", "dbo.Category");
            DropIndex("dbo.ActivityProfile", new[] { "Profile_Id" });
            DropIndex("dbo.ActivityProfile", new[] { "Activity_Id" });
            DropIndex("dbo.Profile", new[] { "NickName" });
            DropIndex("dbo.Category", new[] { "Code" });
            DropIndex("dbo.Activity", new[] { "Category_Id" });
            DropIndex("dbo.Activity", new[] { "Profile_Id" });
            DropTable("dbo.ActivityProfile");
            DropTable("dbo.Profile");
            DropTable("dbo.Category");
            DropTable("dbo.Activity");
        }
    }
}
