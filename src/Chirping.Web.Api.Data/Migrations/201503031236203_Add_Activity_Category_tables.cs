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
                        ContentText = c.String(nullable: false, maxLength: 250),
                        MaxParticipants = c.Int(nullable: false),
                        Category_Id = c.Int(nullable: false),
                        Owner_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Category", t => t.Category_Id)
                .ForeignKey("dbo.Profile", t => t.Owner_Id)
                .Index(t => t.Category_Id)
                .Index(t => t.Owner_Id);
            
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
                        ActivityId = c.Int(nullable: false),
                        ProfileId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ActivityId, t.ProfileId })
                .ForeignKey("dbo.Activity", t => t.ActivityId)
                .ForeignKey("dbo.Profile", t => t.ProfileId)
                .Index(t => t.ActivityId)
                .Index(t => t.ProfileId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ActivityProfile", "ProfileId", "dbo.Profile");
            DropForeignKey("dbo.ActivityProfile", "ActivityId", "dbo.Activity");
            DropForeignKey("dbo.Activity", "Owner_Id", "dbo.Profile");
            DropForeignKey("dbo.Activity", "Category_Id", "dbo.Category");
            DropIndex("dbo.ActivityProfile", new[] { "ProfileId" });
            DropIndex("dbo.ActivityProfile", new[] { "ActivityId" });
            DropIndex("dbo.Category", new[] { "Code" });
            DropIndex("dbo.Activity", new[] { "Owner_Id" });
            DropIndex("dbo.Activity", new[] { "Category_Id" });
            DropTable("dbo.ActivityProfile");
            DropTable("dbo.Category");
            DropTable("dbo.Activity");
        }
    }
}
