namespace Support.Warning.Traffic.BorderGuard.Common;

public class RespondApi<T>
{
    public ResultRespond Result { get; set; }
    public string Code { get; set; } = "00";
    public string Message { get; set; }
    public T Data { get; set; }
    public object Error { get; set; }
    public RespondApi()
    {

    }
    public RespondApi(ResultRespond result, string code, string message, T data, object error = null )
    {
        Result = result;
        Code = code;
        Message = message;
        Data = data;
        Error = error;
    }
}

public enum ResultRespond
{
    Error, Succeeded, Failed, NotFound, Duplication
}