import BaseUnitTests from "../unit/BaseUnitTests";

export default class BaseManualTest
    extends BaseUnitTests
{

    //
    // constructor(opts?)
    // {
    //     opts = opts || {};
    //     console.log(this.constructor.name);
    //     this.db = opts.db;
    // }
    //
    //
    // async init()
    // {
    // }
    //
    // static async createAndRun(opts?)
    // {
    //     let obj = await this.create(opts);
    //     await obj.run();
    //
    //     return obj;
    // }
    //
    // static async create(opts?)
    // {
    //     let self = this;
    //     let obj = new self(opts);
    //
    //     await obj.init();
    //
    //     return obj;
    //
    // }
    //
    //
    // async run()
    // {
    //     console.log(`running tests`,this.constructor.name);
    //
    // }
    //
    //
    //
    //
    // static async runAsScript(exitOnComplete = false)
    // {
    //     try {
    //         console.log(`${this.constructor.name} runAsScript`);
    //         await require('./../../init')();
    //         await this.createAndRun();
    //         console.log(`finished tests`);
    //         if (exitOnComplete)
    //         {
    //             setTimeout(() => {
    //                 process.exit(0);
    //             },1000);
    //         }
    //         else {
    //             return true;
    //
    //         }
    //
    //     }
    //     catch (e)
    //     {
    //         console.error(e);
    //         if (exitOnComplete)
    //         {
    //             setTimeout(() => {
    //                 process.exit(1);
    //             },1000);
    //         }
    //         else {
    //             return false;
    //         }
    //
    //     }
    // }


}


