namespace Support.Warning.Traffic.BorderGuard.Common
{
    public class RespondApiPaging<T> where T : class
    {
        public ResultRespond Result { get; set; }
        public string Code { get; set; } = "00";
        public string Message { get; set; }
        public T Data { get; set; }
        public PagingResponse PagingResponse { get; set; }

    }
}
