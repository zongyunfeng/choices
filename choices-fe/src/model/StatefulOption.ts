import {Option} from "./Option";

class StatefulOption<T extends Option> {
    /**
     * the actual option
     */
    option: T;
    /**
     * the check status of the option
     */
    status: boolean;

    private constructor(data: StatefulOption<T>) {
        this.option = data.option
        this.status = data.status;
    }

    /**
     * create an object of the StatefulOption with the provided option
     * @param option {Option} the actual option
     * @param status {boolean} the check status of the option
     */
    public static create<T extends Option>(option: T, status: boolean = false) {
        return new StatefulOption({
            option, status
        })
    }

}

export {StatefulOption}