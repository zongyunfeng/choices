class Option {
  /**
   * the id of the option
   */
  id: string;
  /**
   * the title of the option
   */
  title: string;
  /**
   * the count of match of this option
   */
  count: number;

  constructor(data?: Option) {
    this.id = data?.id || '';
    this.title = data?.title || '';
    this.count = data?.count || 0;
  }
}

export { Option };
