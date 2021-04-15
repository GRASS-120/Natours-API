class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1) фильтрация
    const queryObj = { ...this.queryString };
    const fields = ['page', 'sort', 'limit', 'fields'];
    fields.forEach((el) => delete queryObj[el]);

    // 2) более крутая фильтрация
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));

    return this; // возвращает весь объект чтобы его потом можно было отсортировать
  }

  sort() {
    // ! СОРТИОВКА НЕ РАБОТАЕТ (ХЗ ПОЧЕМУ)
    if (this.queryString.sort) {
      this.queryString = this.queryString.sort(this.query.sort);
    }
    return this;
  }
}

module.exports = APIFeatures;
