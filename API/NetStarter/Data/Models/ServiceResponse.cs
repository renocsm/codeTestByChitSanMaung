namespace NetStarter.Data.Models
{
    public class ServiceResponse<T>
    {
        public T Data { get; set; }

        public bool Success { get; set; } = true;

        public string Error { get; set; }

        public string Message { get; set; } = null;

        public APIStatus Status { get; set; }

    }

    public enum APIStatus { 
        
        Successful = 0,
        Error = 1,
        SystemError = 2,
    
    }

}
