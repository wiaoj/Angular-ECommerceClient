import { DialogModule } from "@angular/cdk/dialog";
import { NgModule } from "@angular/core";
import { DeleteDirective } from "./delete.directive";

@NgModule({
	declarations: [DeleteDirective],
	imports: [DialogModule],
	exports: [DeleteDirective],
})
//modüller arasında hata verdiği için modül oluşturup componentlere dağıttık
export class DeleteDirectiveModule {}
