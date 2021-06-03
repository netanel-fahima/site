import {Subscriber} from 'rxjs';

export const AutoUnsub = () => constructor => {
  const orig = constructor.prototype.ngOnDestroy;
  constructor.prototype.ngOnDestroy = function() {
    for (const prop in this) {
      const property = this[prop];
      if (property instanceof Subscriber) {
        property.unsubscribe();
      }
    }
    orig.apply();
  };
};
