import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Env } from "./config/env.schema";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // /api
    app.setGlobalPrefix("api");

    // /api/v1
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "1",
    });

    const port = app.get(ConfigService<Env>).get("PORT");
    await app.listen(port);
}
bootstrap();
