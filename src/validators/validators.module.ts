import { Module } from "@nestjs/common";

import { UniqueConstraint } from "./unique/unique.constraint";

@Module({
  providers: [UniqueConstraint],
  exports: [UniqueConstraint],
})
export class ValidatorsModule {}
