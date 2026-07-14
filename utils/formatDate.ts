export function formatDate(date: string | Date, locale = "az-AZ", options?: Intl.DateTimeFormatOptions) {
   return new Intl.DateTimeFormat(
      locale,
      options ?? {
         day: "2-digit",
         month: "long",
         year: "numeric",
      },
   ).format(new Date(date));
}

export function formatDateTime(date: string | Date, locale = "az-AZ") {
   return formatDate(date, locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   });
}

export function formatRelativeDate(date: string | Date) {
   const target = new Date(date);

   const now = new Date();

   const diff = now.getTime() - target.getTime();

   const minute = 60 * 1000;
   const hour = 60 * minute;
   const day = 24 * hour;

   if (diff < hour) {
      return `${Math.max(1, Math.floor(diff / minute))} dəqiqə əvvəl`;
   }

   if (diff < day) {
      return `${Math.floor(diff / hour)} saat əvvəl`;
   }

   if (diff < day * 7) {
      return `${Math.floor(diff / day)} gün əvvəl`;
   }

   return formatDate(target);
}
