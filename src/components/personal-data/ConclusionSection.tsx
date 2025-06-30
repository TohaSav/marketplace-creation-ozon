export default function ConclusionSection() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        11. Заключительные положения
      </h2>
      <div className="bg-muted/20 p-6 rounded-lg">
        <p className="text-muted-foreground leading-relaxed mb-4">
          Настоящее согласие действует с момента выражения согласия и до момента
          его отзыва или уничтожения персональных данных.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Оператор оставляет за собой право вносить изменения в настоящее
          согласие. О существенных изменениях субъект персональных данных будет
          уведомлен любым доступным способом.
        </p>
        <div className="bg-primary/10 p-4 rounded border-l-4 border-primary">
          <p className="text-sm font-medium">
            Важно: Продолжая использовать наш маркетплейс, вы подтверждаете свое
            согласие на обработку персональных данных в соответствии с условиями
            данного согласия.
          </p>
        </div>
      </div>
    </section>
  );
}
