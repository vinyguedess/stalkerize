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
            const value: any = typeof objectToBeChecked[field] !== "undefined" ? objectToBeChecked[field] : null;

            this.validationMap[field].map(rule => {
                if (rule.indexOf("required") >= 0 && !value)
                    this.addError(field, "is required");

                if (/min:[0-9]+/.test(rule))
                {
                    const [,minValue] = rule.split(":");
                    if (typeof value === "string" && value.length < minValue)
                        this.addError(field, `should have at least ${minValue} characters`);
                    else if (typeof value === "number" && value < minValue)
                        this.addError(field, `should be at least ${minValue}`);
                }

                if (/max:[0-9]+/.test(rule))
                {
                    const [,maxValue] = rule.split(":");
                    if (typeof value === "string" && value.length > maxValue)
                        this.addError(field, `should have at most ${maxValue} characters`);
                    else if (typeof value === "number" && value > maxValue)
                        this.addError(field, `should be at most ${maxValue}`);
                }
            })            
        });

        return this;
    }

}