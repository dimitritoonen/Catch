namespace Chirping.Web.Api.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Linked_Table_Participants_Activities : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Activity", "ProfileId", "dbo.Profile");
            DropForeignKey("dbo.Profile", "ActivityId", "dbo.Activity");
            DropIndex("dbo.Activity", new[] { "ProfileId" });
            DropIndex("dbo.Profile", new[] { "ActivityId" });
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
            
            DropColumn("dbo.Activity", "ProfileId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Profile", "ActivityId", c => c.Int());
            AddColumn("dbo.Activity", "ProfileId", c => c.Int());
            DropForeignKey("dbo.ActivityProfile", "ProfileId", "dbo.Profile");
            DropForeignKey("dbo.ActivityProfile", "ActivityId", "dbo.Activity");
            DropIndex("dbo.ActivityProfile", new[] { "ProfileId" });
            DropIndex("dbo.ActivityProfile", new[] { "ActivityId" });
            DropTable("dbo.ActivityProfile");
            CreateIndex("dbo.Profile", "ActivityId");
            CreateIndex("dbo.Activity", "ProfileId");
            AddForeignKey("dbo.Profile", "ActivityId", "dbo.Activity", "Id");
            AddForeignKey("dbo.Activity", "ProfileId", "dbo.Profile", "Id");
        }
    }
}
