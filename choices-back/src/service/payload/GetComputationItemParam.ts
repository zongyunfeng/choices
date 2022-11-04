class GetComputationItemParam {
  /**
   * the id of the requested computation item
   */
  id: string;

  constructor(data?: GetComputationItemParam) {
    this.id = data?.id || '';
  }
}

export { GetComputationItemParam };
