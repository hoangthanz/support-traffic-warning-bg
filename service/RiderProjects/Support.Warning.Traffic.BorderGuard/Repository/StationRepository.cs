using Microsoft.EntityFrameworkCore;
using Support.Warning.Traffic.BorderGuard.Common;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class StationRepository : RepositoryBase<Station>, IStationRepository
{
    private readonly SupportWarningContext _context;

    public StationRepository(SupportWarningContext context) : base(context)
    {
        _context = context;
    }


    public async Task<RespondApi<List<Station>>> GetAll()
    {
        try
        {
            var stations = await _context.Stations.Where(x => !x.IsDeleted).ToListAsync();
            return new RespondApi<List<Station>>
            {
                Code = "00",
                Message = "Success",
                Data = stations,
                Result = ResultRespond.Succeeded
            };
        }
        catch (Exception e)
        {
            return new RespondApi<List<Station>>
            {
                Code = "00",
                Message = "Error",
                Data = null,
                Result = ResultRespond.Error
            };
        }
    }

    public async Task<RespondApi<Station>> GetById(int id)
    {
        try
        {
            var station = await _context.Stations.Where(x => x.Id == id && !x.IsDeleted).FirstOrDefaultAsync();
            return new RespondApi<Station>
            {
                Code = "00",
                Message = "Success",
                Data = station,
                Result = ResultRespond.Succeeded
            };
        }
        catch (Exception e)
        {
            return new RespondApi<Station>
            {
                Code = "00",
                Message = "Error",
                Data = null,
                Result = ResultRespond.Error
            };
        }
    }

    public async Task<RespondApi<Station>> CreateAsync(Station model)
    {
        try
        {
            var gate = await _context.Gates.FirstOrDefaultAsync(x => x.Id == model.GateId && !x.IsDeleted);
            if (gate == null)
            {
                return new RespondApi<Station>
                {
                    Code = "00",
                    Message = "Không tìm thấy cửa khẩu",
                    Data = null,
                    Result = ResultRespond.Error
                };
            }

            var station = await _context.Stations.FirstOrDefaultAsync(x =>
                !x.IsDeleted && x.Name == model.Name && x.GateId == model.GateId);
            if (null != station)
                return new RespondApi<Station>
                {
                    Code = "00",
                    Message = "Đã tồn tại trạm này trong cửa khẩu",
                    Data = null,
                    Result = ResultRespond.Error
                };

            var newStation = new Station
            {
                Name = model.Name,
                GateId = model.GateId,
                CreatedDate = DateTime.Now,
                IsDeleted = false,
                Address = model.Address,
                Phone = model.Phone,
                Email = model.Email,
                Website = model.Website,
                Latitude = model.Latitude,
                Longitude = model.Longitude,
                Description = model.Description,
                Status = model.Status
            };

            await _context.Stations.AddAsync(newStation);
            await _context.SaveChangesAsync();
            return new RespondApi<Station>
            {
                Code = "00",
                Message = "Thêm thành công",
                Data = newStation,
                Result = ResultRespond.Succeeded
            };
        }
        catch (Exception e)
        {
            return new RespondApi<Station>
            {
                Code = "00",
                Message = "Lỗi ngoại lệ khi thêm",
                Data = null,
                Result = ResultRespond.Error
            };
        }
    }

    public async Task<RespondApi<Station>> UpdateAsync(int id, Station obj)
    {
        try
        {
            var station = await _context.Stations.FirstOrDefaultAsync(x =>
                !x.IsDeleted && x.Id == id);
            if (null == station)
                return new RespondApi<Station>
                {
                    Code = "00",
                    Message = "Trạm này không tồn tại trong cơ sở dữ liệu",
                    Data = null,
                    Result = ResultRespond.Error
                };
            if(id !=  obj.Id)
                return new RespondApi<Station>
                {
                    Code = "00",
                    Message = "Dữ liệu thay đổi thông tin trạm không trùng mã trạm",
                    Data = null,
                    Result = ResultRespond.Error
                };
            
            var gate = await _context.Gates.FirstOrDefaultAsync(x => x.Id == obj.GateId && !x.IsDeleted);
            if (gate == null)
            {
                return new RespondApi<Station>
                {
                    Code = "00",
                    Message = "Không tìm thấy cửa khẩu",
                    Data = null,
                    Result = ResultRespond.Error
                };
            }

            // update
            station.Name = obj.Name;
            station.GateId = obj.GateId;
            station.CreatedDate = DateTime.Now;
            station.IsDeleted = false;
            station.Address = obj.Address;
            station.Phone = obj.Phone;
            station.Email = obj.Email;
            station.Website = obj.Website;
            station.Latitude = obj.Latitude;
            station.Longitude = obj.Longitude;
            station.Description = obj.Description;
            station.Status = obj.Status;
         
            await _context.SaveChangesAsync();
            return new RespondApi<Station>
            {
                Code = "00",
                Message = "Cập nhật thành công",
                Data = station,
                Result = ResultRespond.Succeeded
            };
        }
        catch (Exception e)
        {
            return new RespondApi<Station>
            {
                Code = "00",
                Message = "Lỗi ngoại lệ khi cập nhật",
                Data = null,
                Result = ResultRespond.Error
            };
        }
    }

    public async Task<RespondApi<Station>> RemoveAsync(int id)
    {
        try
        {
            var station = await _context.Stations.FirstOrDefaultAsync(x =>
                !x.IsDeleted && x.Id == id);
            if (null == station)
                return new RespondApi<Station>
                {
                    Code = "00",
                    Message = "Trạm này không tồn tại trong cơ sở dữ liệu",
                    Data = null,
                    Result = ResultRespond.Error
                };
            
            station.IsDeleted = true;
            await _context.SaveChangesAsync();
            return new RespondApi<Station>
            {
                Code = "00",
                Message = "Xóa thành công",
                Data = station,
                Result = ResultRespond.Succeeded
            };
        }
        catch (Exception e)
        {
            return new RespondApi<Station>
            {
                Code = "00",
                Message = "Xóa trạm không thành công",
                Data = null,
                Result = ResultRespond.Error
            };
        }
    }
}