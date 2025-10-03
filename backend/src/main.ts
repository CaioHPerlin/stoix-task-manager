import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "./config/environment-variables";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // /api
    app.setGlobalPrefix("api");

    // /api/v1
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "1",
    });

    const port = app.get(ConfigService<EnvironmentVariables>).get("PORT");
    await app.listen(port);
}
bootstrap();
