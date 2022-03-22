#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["rapyd-sample/rapyd-sample.csproj", "rapyd-sample/"]
RUN dotnet restore "rapyd-sample/rapyd-sample.csproj"
COPY . .
WORKDIR "/src/rapyd-sample"
RUN dotnet build "rapyd-sample.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "rapyd-sample.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "rapyd-sample.dll"]