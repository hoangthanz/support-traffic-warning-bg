FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Support.Warning.Traffic.BorderGuard.csproj", "./"]
RUN dotnet restore "Support.Warning.Traffic.BorderGuard.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "Support.Warning.Traffic.BorderGuard.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Support.Warning.Traffic.BorderGuard.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Support.Warning.Traffic.BorderGuard.dll"]
