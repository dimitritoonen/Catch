namespace Chirping.Web.Api.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Category_and_Activity_entities : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Activity",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ContentText = c.String(nullable: false, maxLength: 250),
                        MaxParticipants = c.Int(nullable: false),
                        CategoryId = c.Int(nullable: false),
                        ProfileId = c.Int(),
                        OwnerId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Category", t => t.CategoryId, cascadeDelete: true)
                .ForeignKey("dbo.Profile", t => t.ProfileId)
                .ForeignKey("dbo.Profile", t => t.OwnerId, cascadeDelete: true)
                .Index(t => t.CategoryId)
                .Index(t => t.ProfileId)
                .Index(t => t.OwnerId);
            
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
           
        }
        
        public override void Down()
        {
        }
    }
}
