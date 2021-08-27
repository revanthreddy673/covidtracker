export class MonthlyCases {
  constructor(
    public id: number,
    public timePeriod: string,
    public region: string,
    public confirmedCases: number,
    public activeCases: number,
    public recovered: number,
    public deaths: number
  ) {}
}
