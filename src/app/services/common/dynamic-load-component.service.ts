import { ViewContainerRef, ComponentFactoryResolver, Injectable } from "@angular/core";
import { BaseComponent } from "src/app/components/base.component";

@Injectable({
	providedIn: "root",
})
export class DynamicLoadComponentService {
	constructor() {}

	async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
		let _component: any = null;

		switch (component) {
			case ComponentType.BasketsComponent:
				_component = await (await import("../../components/ui/components/baskets/baskets.component")).BasketsComponent;
				break;
		}

		viewContainerRef.clear(); //önceki viewlar clear ediliyor
		return viewContainerRef.createComponent(_component);
	}
}

export enum ComponentType {
	BasketsComponent,
}
