import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_Services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Week } from '../../../_Models/week.model';
import { WeekService } from '../../../_Services/week.service';
import { UIService } from '../../../_Services/ui.service';

@Component({
  selector: 'log-add',
  templateUrl: './log-add.component.html',
  styleUrls: ['./log-add.component.css']
})
export class LogAddComponent implements OnInit, OnDestroy {


  private _ActiveWeek: Week;

  private listener: Subscription;

  public TimeForm: FormGroup;
  public DateForm: FormGroup;
  public DistanceForm: FormGroup;
  public PaceForm: FormGroup;
  public IntensityForm: FormGroup;
  public CaloricExpenditureForm: FormGroup;

  constructor(private Auth: AuthService, private FormBuilder: FormBuilder, public WeekProvider: WeekService, private ui: UIService)
  {
    this._ActiveWeek = WeekProvider.GetActiveWeek();

    if (this._ActiveWeek == null)
    {
      ui.GoHome();
    }  
    
  } 


  private initForm(): void
  {
    this.DateForm = this.FormBuilder.group({
      Date: [{value: new Date(), disabled: true}, Validators.compose([Validators.required])]
    });
    this.DistanceForm = this.FormBuilder.group({
      Miles: [{value: this.WeekProvider.DeterminePreDistance(), disabled: true}, Validators.compose([Validators.required, Validators.max(4)])]
    });
    this.TimeForm = this.FormBuilder.group({
      Minutes: [null, Validators.compose([Validators.required, Validators.min(1),Validators.max(61)])],
      Seconds: [0, Validators.compose([Validators.required, Validators.min(-1),Validators.max(61)])]
    });
    this.PaceForm = this.FormBuilder.group({
      Pace: [{value: 3.6,disabled: true}, Validators.compose([Validators.required, Validators.min(3.5), Validators.max(4.5)])]
    });
    this.IntensityForm = this.FormBuilder.group({
      TargetHeartRate: [{ value: 149, disabled: true }, Validators.compose([Validators.required, Validators.min(1), Validators.max(220)])],
      EstimatedHeartRate: [1, Validators.compose([Validators.required, Validators.min(1), Validators.max(220)])]
    });
    this.CaloricExpenditureForm = this.FormBuilder.group({
      Time: [{ value: this.TimeForm.controls['Minutes'].value, disabled: true }, Validators.compose([Validators.required, Validators.min(1), Validators.max(61)])],
      CEM: [{ value: 6, disabled: true }, Validators.compose([Validators.required, Validators.min(3), Validators.max(11)])],
      Expenditure: [{value: 0,disabled: true}, Validators.compose([Validators.required])]
    });

    this.TimeForm.controls['Minutes'].valueChanges.subscribe(event =>
    {
      this.CaloricExpenditureForm.controls['Time'].setValue(event);

      this.PaceForm.controls['Pace'].setValue(this.UpdatePace(event, this.TimeForm.controls['Seconds'].value as number));
    });
    this.TimeForm.controls['Seconds'].valueChanges.subscribe(event =>
    {
      this.PaceForm.controls['Pace'].setValue(this.UpdatePace(this.TimeForm.controls['Minutes'].value as number, event));
    });

    this.CaloricExpenditureForm.controls['Time'].valueChanges.subscribe(event =>
    {
      this.CaloricExpenditureForm.controls['Expenditure'].setValue(this.CalculateExpenditure(event, this.CaloricExpenditureForm.controls['CEM'].value as number));
    });

    this.CaloricExpenditureForm.controls['CEM'].valueChanges.subscribe(event =>
    {
      this.CaloricExpenditureForm.controls['Expenditure'].setValue(this.CalculateExpenditure(this.CaloricExpenditureForm.controls['Time'].value as number, event));
    });
    
  }

  private UpdatePace(minute:number, seconds:number): number
  { 
    return this.WeekProvider.DeterminePrePace(minute, seconds);
  }

  private CalculateExpenditure(time: number, cem: number): number
  { 
    return time * cem;
  }

  public ValidateNumber(element: any, form: FormGroup,control: string)
  { 
    var intValue = Math.round(form.controls[control].value as number);
    form.controls[control].setValue(intValue);
  }

  ngOnInit()
  {
    this.initForm();
  }
  ngOnDestroy()
  { 
    if (this.listener != null)
    { 
      this.listener.unsubscribe();
    }  
  }

}
