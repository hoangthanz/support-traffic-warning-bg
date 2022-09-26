using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common.Service.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

[BsonIgnoreExtraElements]
public class Company: IDateTracking, IUserTracking, ICheckTracking
{
    
    [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
    
    public string Code { get; set; }
    [Required, MaxLength(255)]
    public string TaxCode { get; set; }
    [Required, MaxLength(255)]
    public string Name { get; set; }
    
    public string Address { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Description { get; set; }
    
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public Guid CreatedUserId { get; set; }
    public Guid UpdatedUserId { get; set; }
    public bool IsDeleted { get; set; }
    public bool Status { get; set; }
}