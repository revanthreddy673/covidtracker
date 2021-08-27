export class DailyUpdate {
  constructor(
    public id: number,
    public stateName: string,
    public confirmedCases: number,
    public deaths: number,
    public recovered: number
  ) {}
}
