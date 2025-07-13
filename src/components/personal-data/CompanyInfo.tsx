export default function CompanyInfo() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        1. Оператор персональных данных
      </h2>
      <div className="bg-primary/10 p-6 rounded-lg mb-4">
        <h3 className="font-semibold mb-3">ООО «Calibre Store»</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Юридический адрес:</strong> Репина 19
          </p>
          <p>
            <strong>ОГРН:</strong> 324665800281052
          </p>
          <p>
            <strong>ИНН:</strong> 661208876805
          </p>

          <p>
            <strong>Телефон:</strong> +79049808275
          </p>
          <p>
            <strong>Email:</strong> swi79@bk.ru
          </p>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        Оператор осуществляет обработку персональных данных в соответствии с
        Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и
        иными нормативными правовыми актами Российской Федерации.
      </p>
    </section>
  );
}