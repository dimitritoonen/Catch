namespace Chirping.Web.Api.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_ChainAccept_To_Activity : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Activity", "ChainAccept", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Activity", "ChainAccept");
        }
    }
}
