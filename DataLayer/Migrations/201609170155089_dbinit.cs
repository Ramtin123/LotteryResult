namespace LotteryResultViewer.DataLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dbinit : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.LotteryPrograms",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProgramName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.LotteryWinners",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        LotteryProgram_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.LotteryPrograms", t => t.LotteryProgram_Id)
                .Index(t => t.LotteryProgram_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.LotteryWinners", "LotteryProgram_Id", "dbo.LotteryPrograms");
            DropIndex("dbo.LotteryWinners", new[] { "LotteryProgram_Id" });
            DropTable("dbo.LotteryWinners");
            DropTable("dbo.LotteryPrograms");
        }
    }
}
