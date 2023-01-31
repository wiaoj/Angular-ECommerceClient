import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PasswordUpdateComponent } from "./password-update.component";
import { RouterModule } from "@angular/router";

@NgModule({
	declarations: [PasswordUpdateComponent],
	imports: [CommonModule, RouterModule.forChild([{ path: "", component: PasswordUpdateComponent }])],
})
export class PasswordUpdateModule {}
