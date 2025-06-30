export default function CompanyInfo() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        1. Оператор персональных данных
      </h2>
      <div className="bg-primary/10 p-6 rounded-lg mb-4">
        <h3 className="font-semibold mb-3">ООО «МаркетМастер»</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Юридический адрес:</strong> 115114, г. Москва, ул.
            Примерная, д. 123, к. 1
          </p>
          <p>
            <strong>Почтовый адрес:</strong> 115114, г. Москва, ул. Примерная,
            д. 123, к. 1
          </p>
          <p>
            <strong>ОГРН:</strong> 1234567891011
          </p>
          <p>
            <strong>ИНН:</strong> 7712345678
          </p>
          <p>
            <strong>КПП:</strong> 771201001
          </p>
          <p>
            <strong>Телефон:</strong> +7 (800) 123-45-67
          </p>
          <p>
            <strong>Email:</strong> legal@marketmaster.ru
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
