import {Component} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TuiDay, TuiDayRange} from '@taiga-ui/cdk';

@Component({
    selector: 'tui-mobile-calendar-example-2',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiMobileCalendarExample2 {
    min = new TuiDay(new Date().getFullYear(), new Date().getMonth(), 1);
    max = new TuiDay(new Date().getFullYear(), new Date().getMonth(), 10);

    onChanges(value: TuiDay | TuiDayRange | null) {
        console.info(value);
    }
}
