using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.Mongodb.Services;

public class VehicleRegistrationPaperService
{
    private readonly IMongoCollection<VehicleRegistrationPaper> _vehicleMongoCollection;
    
    public VehicleRegistrationPaperService(
        IOptions<DatabaseSettings> dabaseSettings)
    {
        var mongoClient = new MongoClient(dabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(dabaseSettings.Value.DatabaseName);

        _vehicleMongoCollection = mongoDatabase.GetCollection<VehicleRegistrationPaper>("VehicleRegistrationPaper");
    }
    
    public async Task<List<VehicleRegistrationPaper>> GetAsync() =>
        await _vehicleMongoCollection.Find(_ => true).ToListAsync();

    public async Task<VehicleRegistrationPaper?> GetAsync(string id) =>
        await _vehicleMongoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(VehicleRegistrationPaper vehicleRegistrationPaper)
    {
        try
        {
            vehicleRegistrationPaper.Id = ObjectId.GenerateNewId().ToString();
            await _vehicleMongoCollection.InsertOneAsync(vehicleRegistrationPaper);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
      
    }
    

    public async Task UpdateAsync(string id, VehicleRegistrationPaper updatedEmployee) =>
        await _vehicleMongoCollection.ReplaceOneAsync(x => x.Id == id, updatedEmployee);

    public async Task RemoveAsync(string id) => await _vehicleMongoCollection.DeleteOneAsync(x => x.Id == id);
}