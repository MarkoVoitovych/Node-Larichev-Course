// function Component(id: number) {
// 	console.log('init component');
// 	return (target: Function) => {
// 		console.log('run component');
// 		target.prototype.id = id;
// 	};
// }

// function Logger() {
// 	console.log('init logger');
// 	return (target: Function) => {
// 		console.log('run logger');
// 	};
// }

// function Method(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
// 	console.log('init method', propertyKey);
// 	const oldValue = propertyDescriptor.value;
// 	propertyDescriptor.value = function (...args: any[]) {
// 		return args[0] * 10;
// 	};
// }

// function Prop(target: Object, propertyKey: string) {
// 	let value: number;
// 	const getter = () => {
// 		console.log('Getter');
// 		return value;
// 	};
// 	const setter = (newValue: number) => {
// 		console.log('Setter');
// 		value = newValue;
// 	};
// 	Object.defineProperty(target, propertyKey, {
// 		get: getter,
// 		set: setter,
// 	});
// }

// function Param(target: Object, propertyKey: string, index: number) {
// 	console.log('init Param', propertyKey, index);
// }

// @Logger()
// @Component(1)
// export class User {
// 	@Prop id: number;

// 	@Method
// 	updateId(@Param newId: number) {
// 		this.id = newId;
// 		return this.id;
// 	}
// }

// const user = new User();

// console.log(user.id);
// console.log(user.updateId(2));
