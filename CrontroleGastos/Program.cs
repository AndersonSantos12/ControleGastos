using CrontroleGastos.Server.Services;

System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
Console.OutputEncoding = System.Text.Encoding.UTF8;

var builder = WebApplication.CreateBuilder(args);

//Adiciona os serviços na injeção de dependências
builder.Services.AddSingleton<PersonService>();
builder.Services.AddSingleton<TransactionService>();

// Adiciona suporte a controllers
builder.Services.AddControllers();

//Configuração do CORS para permitir chamadas de qualquer origem
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        );
});

var app = builder.Build();

//Redirecionamento para HTTPS
app.UseHttpsRedirection();
//Habilita o CORS para permitir que o front-end acesse a API
app.UseCors("AllowAll");
app.UseAuthorization();
//Mapeia os endpoints dos controllers
app.MapControllers();

//Inicia a aplicação
app.Run();