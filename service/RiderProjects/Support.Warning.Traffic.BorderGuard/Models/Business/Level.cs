using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson.Serialization.Attributes;
using Support.Warning.Traffic.BorderGuard.Common.Models.Interfaces;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

[BsonIgnoreExtraElements]
public class Level: IDateTracking, IUserTracking, ICheckTracking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Description("Id")]
    public int Id { get; set; }
    
    public string Name { get; set; }
    public string Description { get; set; }

    public string Color { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public Guid CreatedUserId { get; set; }
    public Guid UpdatedUserId { get; set; }
    public bool IsDeleted { get; set; }
    public bool Status { get; set; }
}