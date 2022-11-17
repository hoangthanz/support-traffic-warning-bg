namespace Support.Warning.Traffic.BorderGuard.Common.Models.Interfaces
{
    public interface IUserTracking
    {
        public Guid CreatedUserId { get; set; }
        public Guid UpdatedUserId { get; set; }
    }
}
