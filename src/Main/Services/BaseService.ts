

export default abstract class BaseService
{

    private errors: any = {}

    public getErrors():any
    {
        return this.errors;
    }

    public hasErrors(): boolean
    {
        return Object.keys(this.errors).length > 0;
    }

    protected addError(field: string, message: string): void
    {
        if (!this.errors[field])
            this.errors[field] = [];

        this.errors[field].push(message);
    }

} 