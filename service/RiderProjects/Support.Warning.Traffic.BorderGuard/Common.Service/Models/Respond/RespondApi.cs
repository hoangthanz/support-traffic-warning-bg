namespace Common.Service.Models.Respond;

public class RespondApi<T> where T : class
{
    public ResultRespond Result { get; set; }
    public string Code { get; set; } = "00";
    public string Message { get; set; }
    public T Data { get; set; }

    public RespondApi(ResultRespond result, string code, string message, T data)
    {
        Result = result;
        Code = code;
        Message = message;
        Data = data;
    }
}

public enum ResultRespond
{
    Error, Succeeded, Failed, NotFound, Duplication
}