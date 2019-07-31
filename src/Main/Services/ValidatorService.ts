import BaseService from "./BaseService";


export default class ValidatorService extends BaseService
{

    private validationMap:any;

    public constructor(validationMap: any)
    {
        super();
        this.validationMap = validationMap;
    }

    public static handle(validationMap: Record<string, Array<string>>): ValidatorService
    {
        return new ValidatorService(validationMap);
    }

    public check(objectToBeChecked: any): ValidatorService
    {
        Object.keys(this.validationMap).forEach(field => {
            const value: any = this.getValue(objectToBeChecked, field);

            this.validationMap[field].map(rule => {
                if (rule.indexOf("required") >= 0 && !value)
                    this.addError(field, "is required");

                if (/min:[0-9]+/.test(rule))
                    this.checkOverMinValue(rule, field, value);

                if (/max:[0-9]+/.test(rule))
                    this.checkUnderMaxValue(rule, field, value);
            })            
        });

        return this;
    }

    private getValue(objectToBeChecked: any, field: string, defaultValue: any = null): any
    {
        if (typeof objectToBeChecked[field] === "undefined")
            return defaultValue;
            
        return objectToBeChecked[field]
    }

    private checkOverMinValue(rule:string, field: string, value: any): void
    {
        const [,minValue] = rule.split(":");
        if (typeof value === "string" && value.length < parseInt(minValue))
            this.addError(field, `should have at least ${minValue} characters`);
        else if (typeof value === "number" && value < parseInt(minValue))
            this.addError(field, `should be at least ${minValue}`);
    }

    private checkUnderMaxValue(rule: string, field: string, value: any): void
    {
        const [,maxValue] = rule.split(":");
        if (typeof value === "string" && value.length > parseInt(maxValue))
            this.addError(field, `should have at most ${maxValue} characters`);
        else if (typeof value === "number" && value > parseInt(maxValue))
            this.addError(field, `should be at most ${maxValue}`);
    }

}