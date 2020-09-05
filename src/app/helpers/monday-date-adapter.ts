import { NativeDateAdapter } from '@angular/material';

export class MondayDateAdapter extends NativeDateAdapter {
  getFirstDayOfWeek(): number {
    return 1;
  }
}