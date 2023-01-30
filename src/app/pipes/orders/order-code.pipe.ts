import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "orderCode",
})
export class OrderCodePipe implements PipeTransform {
	transform(value: string, arg?: number): string {
		return `${value.slice(0, arg && value.length <= arg ? arg : value.length / 2)}...`
	}
}
